declare module "react-qr-reader" {
  import * as React from "react";

  type QrReaderProps = {
    delay?: number | false;
    onError?: (err: Error | null) => void;
    onScan?: (data: string | null) => void;
    style?: React.CSSProperties;
    facingMode?: string;
  };

  const QrReader: React.ComponentType<QrReaderProps>;
  export default QrReader;
}
