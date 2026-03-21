#!/usr/bin/env bash

set -euo pipefail

null_sha='0000000000000000000000000000000000000000'

event_name="${EVENT_NAME:-}"
head_sha="${PR_HEAD_SHA:-${HEAD_SHA:-}}"
base_sha="${BASE_SHA:-}"
before_sha="${BEFORE_SHA:-}"
default_branch="${DEFAULT_BRANCH:-}"

fetch_commit() {
  local sha="$1"

  if [[ -z "$sha" || "$sha" == "$null_sha" ]]; then
    return 0
  fi

  if git cat-file -e "${sha}^{commit}" 2>/dev/null; then
    return 0
  fi

  git fetch --no-tags --depth=1 origin "$sha"
}

fetch_branch() {
  local branch="$1"

  if [[ -z "$branch" ]]; then
    return 1
  fi

  if git show-ref --verify --quiet "refs/remotes/origin/${branch}"; then
    return 0
  fi

  git fetch --no-tags --depth=1 origin "${branch}:refs/remotes/origin/${branch}"
}

merge_base_or_empty() {
  local left="$1"
  local right="$2"

  git merge-base "$left" "$right" 2>/dev/null || true
}

log_detection_result() {
  local has_impact="$1"
  local diff_range="$2"
  shift 2
  local impactful=("$@")

  echo "::group::Package impact detection"
  echo "Event: $event_name"
  echo "Evaluated diff: ${diff_range:-unknown}"
  echo "Package/build impact: $has_impact"
  if ((${#impactful[@]} > 0)); then
    echo "Impactful files:"
    printf ' - %s\n' "${impactful[@]}"
  else
    echo "Impactful files: none"
  fi
  echo "::endgroup::"

  if [[ "$has_impact" == 'true' ]]; then
    echo "::notice::Package/build impact detected."
  else
    echo "::notice::No package/build impact detected. Skipping heavy test matrix."
  fi
}

log_detection_fallback() {
  local reason="$1"

  echo "::warning::Package impact detection defaulted to impact=true: $reason"
}

file_has_impact() {
  local path="$1"

  case "$path" in
    .changeset/*) return 0 ;;
    .github/actions/detect-package-impact/*) return 0 ;;
    .github/workflows/runTestsOnPush.yml) return 0 ;;
    eslint.config.ts) return 0 ;;
    package-lock.json) return 0 ;;
    package.json) return 0 ;;
    turbo.json) return 0 ;;
    packages/*/README.MD) return 0 ;;
    packages/*/package.json) return 0 ;;
    packages/*/src/*) return 0 ;;
    packages/*/tsconfig.json) return 0 ;;
    *) return 1 ;;
  esac
}

set_multiline_output() {
  local key="$1"
  shift

  {
    printf '%s<<__EOF__\n' "$key"
    if (($# > 0)); then
      printf '%s\n' "$@"
    fi
    printf '__EOF__\n'
  } >> "$GITHUB_OUTPUT"
}

changed_files=()
impactful_files=()
diff_base=''

case "$event_name" in
  pull_request)
    fetch_commit "$base_sha"
    fetch_commit "$head_sha"
    diff_base="$(merge_base_or_empty "$base_sha" "$head_sha")"
    ;;
  push)
    fetch_commit "$head_sha"
    if [[ -n "$before_sha" && "$before_sha" != "$null_sha" ]]; then
      fetch_commit "$before_sha"
      diff_base="$before_sha"
    elif fetch_branch "$default_branch"; then
      diff_base="$(merge_base_or_empty "refs/remotes/origin/${default_branch}" "$head_sha")"
    fi
    ;;
  *)
    printf 'has-impact=true\n' >> "$GITHUB_OUTPUT"
    set_multiline_output changed-files
    set_multiline_output impactful-files
    log_detection_fallback "unsupported event '$event_name'"
    exit 0
    ;;
esac

if [[ -z "$diff_base" ]]; then
  printf 'has-impact=true\n' >> "$GITHUB_OUTPUT"
  set_multiline_output changed-files
  set_multiline_output impactful-files
  log_detection_fallback 'unable to determine a diff base'
  exit 0
fi

while IFS= read -r path; do
  [[ -z "$path" ]] && continue
  changed_files+=("$path")
  if file_has_impact "$path"; then
    impactful_files+=("$path")
  fi
done < <(git diff --name-only "$diff_base" "$head_sha")

has_impact=false
if ((${#impactful_files[@]} > 0)); then
  has_impact=true
fi

printf 'has-impact=%s\n' "$has_impact" >> "$GITHUB_OUTPUT"
set_multiline_output changed-files "${changed_files[@]}"
set_multiline_output impactful-files "${impactful_files[@]}"
log_detection_result "$has_impact" "$diff_base..$head_sha" "${impactful_files[@]}"

if [[ -n "${GITHUB_STEP_SUMMARY:-}" ]]; then
  {
    echo '## Package impact detection'
    echo
    echo "- Event: \`$event_name\`"
    echo "- Evaluated diff: \`$diff_base..$head_sha\`"
    echo "- Has package/build impact: \`$has_impact\`"
    echo
    echo '### Impactful files'
    if ((${#impactful_files[@]} > 0)); then
      printf -- '- `%s`\n' "${impactful_files[@]}"
    else
      echo '- None'
    fi
  } >> "$GITHUB_STEP_SUMMARY"
fi
