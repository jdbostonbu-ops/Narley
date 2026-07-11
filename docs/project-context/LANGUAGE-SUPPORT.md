# LANGUAGE-SUPPORT.md

# Narley Language Support Specification

**Project:** Narley

**Document Version:** 3.0.0

**Status:** Draft

**Last Updated:** YYYY-MM-DD

---

# Purpose

Narley is designed to be accessible to as many individuals as possible, regardless of their primary language.

Version 3 introduces multilingual support through a configurable language selector while maintaining a consistent user experience across the Reader and Provider applications.

Language support is considered a core accessibility feature.

---

# Goals

The language system should:

- Reduce language barriers.
- Improve accessibility.
- Increase usability.
- Support future expansion.
- Allow users to change languages without creating a new account.

---

# Version 3 Scope

Version 3 includes:

- Approximately 67 supported languages.
- Language selection from the Reader Profile.
- Language selection from the Provider Profile.
- Persistent language preference.
- Automatic interface updates after language changes.

The exact language list may evolve over time.

---

# Language Selection

Language selection is available within the Profile screen.

Readers and Providers may change their preferred language at any time.

The selected language should remain associated with the user's account and be restored when the user signs in again.

---

# Default Language

Default language:

English (United States)

If no preference exists, Narley should default to English.

---

# Supported Languages

Version 3 is designed to support approximately 67 languages.

Examples include:

- English
- Spanish
- French
- Portuguese
- Arabic
- Chinese (Simplified)
- Chinese (Traditional)
- Vietnamese
- Haitian Creole
- Polish
- Russian
- Korean
- Japanese
- Hindi

Additional languages may be added without redesigning the application.

---

# Translation Strategy

The interface should use localization resource files rather than hard-coded text.

All user-visible strings should be externalized.

Avoid embedding text directly within components whenever practical.

---

# Language Resources

Recommended structure:

```text
locales/

en/

es/

fr/

ar/

zh/

...
```

Each language should provide the same translation keys.

---

# User Interface

Changing the selected language should update:

- Navigation labels
- Buttons
- Menus
- Dialogs
- Alerts
- Empty states
- Error messages
- Confirmation dialogs
- Profile labels
- Settings

---

# Resource Data

Resource names should remain unchanged unless officially translated by the Provider.

Example:

Organization Name

Community Partners in Action

remains

Community Partners in Action

Descriptions and notes may be translated if translations are available.

---

# Accessibility

Language support should work with:

- Screen readers
- Accessible labels
- Large text
- High contrast mode

Language selection should remain accessible to users with limited technical experience.

---

# Layout Considerations

Translations vary in length.

Layouts should:

- Support longer text.
- Avoid clipped labels.
- Allow wrapping where appropriate.
- Avoid fixed-width text containers.

---

# Right-to-Left Languages

The architecture should support right-to-left languages.

Examples include:

- Arabic
- Hebrew

Layout mirroring should be supported where appropriate.

---

# Error Handling

If a translation is unavailable:

- Display the default English string.
- Never display missing translation keys.
- Log missing translations during development.

The application should remain fully usable.

---

# Business Rules

The following rules apply:

- Language changes should not require restarting the application.
- Language preference should persist across sessions.
- Language selection should not affect stored resource data.
- Users may change languages at any time.

---

# Future Enhancements

Potential future improvements include:

- Automatic language detection.
- Region-specific localization.
- Provider-supplied translations.
- AI-assisted translation review.

Future enhancements require documentation and approval.

---

# Out of Scope

Version 3 does not include:

- Automatic translation of Provider-entered resource content.
- Machine translation of community reports.
- Voice translation.
- Live interpreter services.

---

# Guiding Principle

Every user should be able to navigate Narley in the language they are most comfortable using while preserving the accuracy of community resource information.

