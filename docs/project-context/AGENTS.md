# AGENTS.md

## Narley Version 3 TDD Rules

All Version 3 work must follow RED → GREEN → REFACTOR.

### RED

Before implementation:

- Write or port the test first.
- Run the smallest relevant test file.
- Confirm it fails for the expected reason.
- Record the failing output.
- Do not modify the assertion merely to make the test pass.

A RED test must represent approved behavior from:
- TESTING.md
- VERSION-3-BUILD.md
- READER-APP-SPEC.md
- PROVIDER-APP-SPEC.md
- Narley Features.md

### GREEN

Implement only enough code to satisfy the approved test.

After implementation:

- Run the targeted test.
- Confirm it passes.
- Run related tests.
- Run the full suite before completion.

### REFACTOR

Refactor only after GREEN.

Refactoring must:
- preserve behavior,
- keep tests passing,
- follow CODING-STANDARDS.md,
- avoid unnecessary abstraction.

## Non-Negotiable Coding Constraints

- TypeScript strict.
- No `any`.
- No `var`.
- Use `const` by default.
- Use `let` only when reassignment is required.
- Use closure-based arrow functions.
- No class components.
- No `React.FC`.
- No `@ts-ignore`.
- No `@ts-nocheck`.
- No disabled lint rules without approval.
- Render user content safely as plain text.
- Do not inject raw HTML.
- Form controls must have accessible labels and identifiers.
- All destructive actions require confirmation dialogs.
- No mock production data.
- Do not add Future or Post-Capstone features.
- Features pending CPA approval must not be implemented.

## Security & Accessibility (Non-Negotiable)

### User Input

- Never render user-generated content as HTML.
- Render all user-generated text as plain text only.
- Use `textContent` (or the React/React Native equivalent safe text rendering) for user-supplied values to prevent XSS.
- Never use `dangerouslySetInnerHTML`.
- Never inject untrusted HTML into the DOM.

### Forms

- Every form control must have an associated label.
- Every label must be explicitly associated with its input using a unique ID (`htmlFor` / `id`) or the platform-equivalent accessibility relationship.
- Forms must not produce accessibility node violations in browser or React Native accessibility tools.

### Accessibility

- Every interactive element must have an accessible name.
- Buttons must describe their action.
- Icon-only buttons require accessibility labels.
- Images require meaningful alternative text unless decorative.
- Inputs must expose validation errors accessibly.

### Validation

- Validate all user input.
- Never trust client input.
- Sanitize data before persistence when appropriate.

## Command Execution

Jacqueline runs terminal commands.

Codex must:
- state the exact command,
- explain what it verifies,
- wait for the result when necessary,
- never claim a command was run unless Jacqueline provides the output.

## Version 2 Porting Rule

Do not blindly copy Version 2 code.

Before porting a behavior:

1. Write the Version 3 test.
2. Confirm RED.
3. Port only the code required for that behavior.
4. Confirm GREEN.
5. Refactor to match Version 3 architecture.

## Test Integrity

Codex must not:
- delete failing tests,
- skip tests,
- use `.only`,
- use `.skip`,
- weaken assertions,
- replace real behavior with mocks solely to pass,
- mark incomplete behavior as passing.