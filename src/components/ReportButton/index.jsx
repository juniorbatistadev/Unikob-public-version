import Alert from "@components/common/Alert";
import Button from "@components/common/Button";
import ReportForm from "@pages/ProfilePage/components/ReportForm";
import { useState } from "react";
import { saveUserReport } from "src/data/queryUserReports";

function ReportButton({ content }) {
  const onReport = () => {
    Alert.fire({
      html: <ReportForm content={content} />,
      showConfirmButton: false,
    });
  };

  return (
    <Button typeStyle={"secondary"} onClick={onReport}>
      Reportar
    </Button>
  );
}

export default ReportButton;
