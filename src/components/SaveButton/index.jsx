import Button from "@components/common/Button";
import { useEffect, useState } from "react";
import { deleteSaved, isItemSaved, saveSaved } from "src/data/querySaves";

function SaveButton({ title, itemId, type, typeClass }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    isItemSaved({ type, itemId, typeClass }).then((result) => {
      setIsSaved(result);
    });
  }, [type, itemId, typeClass]);

  const handleClick = async () => {
    if (!isSaved)
      saveSaved({ type, itemId, title, typeClass }).then(() => {
        setIsSaved(true);
      });
    if (isSaved)
      deleteSaved({ type, itemId, typeClass }).then(() => {
        setIsSaved(false);
      });
  };

  return (
    <Button typeStyle={"secondary"} onClick={handleClick}>
      {isSaved ? "Guardado  " : " Guardar "}
    </Button>
  );
}

export default SaveButton;
