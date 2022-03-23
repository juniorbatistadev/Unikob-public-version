import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import Title from "@components/common/Title";
import CreateSchoolForm from "./CreateSchoolForm";
import AlertBox from "@components/common/AlertBox";

export default function CreateSchoolPage() {
  return (
    <FlexColumn>
      <FlexRow>
        <GoBackButton /> <Title text="Agregar Escuela" margin="20px 5px" />
      </FlexRow>
      <FlexColumn margin="0px 10px">
        <AlertBox
          text="ATENCION: no podras modificar los datos luego que esten guardados. Debes asegurate que esten correctos."
          type="warning"
        />
      </FlexColumn>

      <CreateSchoolForm />
    </FlexColumn>
  );
}
