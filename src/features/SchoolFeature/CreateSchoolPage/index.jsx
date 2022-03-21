import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import Title from "@components/common/Title";
import CreateSchoolForm from "./CreateSchoolForm";
import styles from "./index.module.css";

export default function CreateSchoolPage() {
  return (
    <FlexColumn>
      <FlexRow>
        <GoBackButton /> <Title text="Agregar Escuela" margin="20px 5px" />
      </FlexRow>
      <CreateSchoolForm />
    </FlexColumn>
  );
}
