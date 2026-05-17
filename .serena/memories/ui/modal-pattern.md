# Modal Pattern

## Custom multi-step modal: `src/components/Modal.tsx`
Use for multi-step form flows with a trigger button. Requires: `form`, `page`, `pageHandler`, `maxPage`, `confirmPage`, `onConfirmClick`, `button` props. Handles carousel pagination, form validation per page, and mobile/desktop layout automatically.

## Simple modals (single page, programmatically opened)
Do NOT use Mantine's `Modal` directly. Use `Modal.Root` compound components with this exact responsive pattern:

```tsx
import { useMediaQuery } from "@mantine/hooks";
import { Modal } from "@mantine/core";

const isMobile = useMediaQuery("(max-width: 50em)") || false;

<Modal.Root
  opened={opened}
  onClose={onClose}
  fullScreen={isMobile}
  transitionProps={{ transition: "slide-up", duration: 200 }}
  centered
>
  <Modal.Overlay />
  <Modal.Content radius={isMobile ? 0 : "lg"}>
    <Modal.Header>...</Modal.Header>
    <Modal.Body>...</Modal.Body>
  </Modal.Content>
</Modal.Root>
```

This matches the responsive behaviour of `Modal.tsx`: full-screen slide-up on mobile, centered dialog on desktop.

## Example: `src/components/UserSelectionModal.tsx`
