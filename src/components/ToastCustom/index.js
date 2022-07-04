import { Toast, Frame, Page, Button } from "@shopify/polaris";
import { useState, useCallback } from "react";

function ToastCustom({ message }) {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast content="Message sent" onDismiss={toggleActive} />
  ) : null;

  return (
    <div style={{ height: "250px" }}>
      <Frame>
        <Toast content={message} onDismiss={toggleActive} />
      </Frame>
    </div>
  );
}

export default ToastCustom;
