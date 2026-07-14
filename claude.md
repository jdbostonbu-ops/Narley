
• ## Root cause

  The Reader is showing the
  default Expo icon because its
  Narley icon configuration was
  changed only in the current
  working tree and has not been
  applied to a rebuilt native
  Reader app.

  The evidence is specific:

  - The committed Reader
    configuration still points
    to Expo’s default assets:
      - icon: "./assets/images/
        icon.png"

      - default Android
        foreground/background/
        monochrome images

      - default favicon
      - default splash image

  - The current apps/reader/
    app.json contains
    uncommitted changes
    replacing those assets with
    the Narley files.

  - Reader’s scripts use expo
    start --ios and expo start
    --android, which launch
    through Expo Go. Expo Go
    retains its own launcher
    icon; changing expo.icon
    does not replace the Expo Go
    application icon.

  - Provider’s scripts use expo
    run:ios and expo
    run:android, which create/
    rebuild a native development
    app and bake its configured
    icon into the binary.

  - App icons are native build-
    time assets. Metro
    refreshes, JavaScript
    reloads, and OTA updates do
    not replace an already-
    installed native icon.

  There is no active
  configuration override
  changing Reader back to the
  Expo icon. This is a stale/
  unrebuilt native-app or Expo
  Go issue.

  ## Icon-related configuration
  comparison

   Setting     expo.icon
   Provider    ./assets/narley-
               icon-1024.png
   Reader      ./assets/narley-
               icon-1024.png
   Difference  None
  ──────────────────────────────
   Setting     Splash image
   Provider    ./assets/narley-
               logo.png
   Reader      ./assets/narley-
               logo.png
   Difference  None
  ──────────────────────────────
   Setting     Splash
               backgroundColor
   Provider    #208AEF
   Reader      #208AEF
   Difference  None
  ──────────────────────────────
   Setting     Splash imageWidth
   Provider    224
   Reader      224
   Difference  None
  ──────────────────────────────
   Setting     android.adaptiveI
               con
   Provider    Not defined
   Reader      Defined
   Difference  Reader-only
  ──────────────────────────────
   Setting     Adaptive
               backgroundColor
   Provider    Inherits normal
               icon behavior
   Reader      #208AEF
   Difference  Reader-only
  ──────────────────────────────
   Setting     Adaptive
               foregroundImage
   Provider    Not defined
   Reader      ./assets/narley-
               icon-1024.png
   Difference  Reader-only
  ──────────────────────────────
   Setting     Adaptive
               backgroundImage
   Provider    Not defined
   Reader      Not defined
   Difference  None
  ──────────────────────────────
   Setting     Adaptive
               monochromeImage
   Provider    Not defined
   Reader      Not defined
   Difference  None
  ──────────────────────────────
   Setting     web.favicon
   Provider    ./assets/narley-
               icon-1024.png
   Reader      ./assets/narley-
               icon-1024.png
   Difference  None

  The only current icon-related
  difference is Reader’s Android
  adaptive-icon configuration.
  It also points to the Narley
  image, so it does not explain
  the Expo icon.

  ## Asset verification

  Both configured icon paths
  resolve successfully:

  - apps/provider/assets/narley-
    icon-1024.png

  - apps/reader/assets/narley-
    icon-1024.png

  Both files are:

  - 16,830 bytes
  - PNG, 1024 × 1024, RGB
  - SHA-256:
    cc3d2f4e9e134a51afa11a49d303
    606c24c0f18b71e01002dc6dec87
    ef37e888

  They are byte-for-byte
  identical. Both splash image
  paths also resolve to existing
  assets/narley-logo.png files.

  Running Expo’s resolved-config
  command confirms that both
  apps currently resolve icon
  to ./assets/narley-icon-
  1024.png.

  ## Override and artifact audit

  - app.config.js: Both apps
    load their own app.json,
    spread appJson.expo, and add
    only extra.apiUrl. Neither
    overrides the icon.

  - assets/expo.icon: Both apps
    contain identical default
    Expo Icon Composer projects,
    including the blue Expo
    symbol. However, neither
    app.json, app.config.js,
    package script, nor project
    code references these
    directories. They are not
    active overrides.

  - Native ios/ or android/
    directories: Neither app
    currently has one. There are
    therefore no checked-out or
    local baked native icon
    assets to override the
    config.

  - eas.json: None exists in the
    repository.

  - EAS profiles/artifacts: None
    were found.

  - .expo cache: Both apps have
    ordinary Expo development
    cache folders, but they
    contain no generated icon or
    native build artifacts.

  - Icon-generation scripts: No
    script or reference using
    expo.icon/icon.json was
    found.

  - Reader’s app.json was
    updated after its
    existing .expo session/cache
    was created, further
    confirming that the visible
    Reader icon predates the
    configuration change.

  ## Exact remediation

  No additional icon
  configuration change is
  required for iOS. Reader
  already resolves to the
  correct Narley icon.

  To install Reader as a native
  development build matching
  Provider:

  cd apps/reader
  npx expo prebuild --clean
  npx expo run:ios

  For Android:

  cd apps/reader
  npx expo prebuild --clean
  npx expo run:android

  Before rebuilding, uninstall
  the old Reader development app
  from the simulator/device to
  prevent the launcher from
  retaining its cached icon.
  Then install the newly built
  app.

  If Reader continues to run
  through Expo Go:

  cd apps/reader
  npx expo start --clear

  This can refresh Reader’s
  project metadata inside Expo
  Go, but the device’s launcher
  will still show Expo Go’s own
  icon. A standalone/dev build
  is required for the Narley
  launcher icon.

  To make Reader’s workflow
  permanently match Provider,
  its package.json scripts
  should eventually be changed
  from:

  "ios": "expo start --ios",
  "android": "expo start
  --android"

  to:

  "ios": "expo run:ios",
  "android": "expo run:android"

  No files were changed during
  this investigation.
