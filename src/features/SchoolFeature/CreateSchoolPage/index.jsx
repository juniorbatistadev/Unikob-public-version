import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import Title from "@components/common/Title";
import CreateSchoolForm from "./CreateSchoolForm";
import styles from "./index.module.css";
import Text from "@components/common/Text";

export default function CreateSchoolPage() {
  return (
    <FlexColumn>
      <FlexRow>
        <GoBackButton /> <Title text="Agregar Escuela" margin="20px 5px" />
      </FlexRow>
      <Text
        margin={10}
        text="ATENCION: no podras modificar los datos luego que esten guardados. Debes asegurate que esten correctos."
      />

      <CreateSchoolForm />
    </FlexColumn>
  );
}
