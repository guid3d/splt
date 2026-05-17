# Mantine Styling Priority

Always use component props before `styles` or inline CSS.

1. **Component props first**: `radius`, `color`, `variant`, `size`, `gap`, `p`, `m`, etc.
2. **`styles` prop**: only when no component prop exists for the property
3. **CSS variables**: `var(--mantine-radius-xl)` only as last resort inside `styles`

## Example
```tsx
// Bad
<Menu styles={{ dropdown: { borderRadius: "var(--mantine-radius-md)" } }} />

// Good
<Menu radius="md" />
```

Check Mantine docs for available props before reaching for `styles`.
