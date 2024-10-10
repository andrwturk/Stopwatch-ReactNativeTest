# Stopwatch

<img src="./screenshots/screenshot.png" alt="Description of the screenshot" width="300"/>

## Key Takeaways

- **Feature-Based Architecture**: App is structured by features for modularity and maintainability.
- **Business Logic First**: Development begins with business logic and unit testing in `model.js`.
- **Testability Focus**: Jotai enables reactive UI updates and allows for modular testing, from small units to larger integrations.
- **Simple UI Layer**: The UI only renders view items provided by the presentation layer.
- **Presenter-Driven**: Each Presenter matches its feature name and bridges the model and UI layers.

## Future Considerations

- **Isolate Jotai Storage**: Explore ways to isolate Jotai atoms per feature for predictable data sharing.
