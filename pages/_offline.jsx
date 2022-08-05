import FlexColumn from "@components/common/FlexColumn";
import Title from "@components/common/Title";
import OfflineIllustration from "@assets/icons/offline.svg";
import Text from "@components/common/Text";

function OfflinePage() {
  return (
    <FlexColumn alignItems={"center"} padding={10} margin={"10px 0px 0px 0px"}>
      <OfflineIllustration width={250} height={250} />
      <FlexColumn alignItems={"center"} padding={40}>
        <Title text={"Sin Conexion"} />
        <Text
          text={"Conectate al internet para acceder al contenido"}
          style={{ textAlign: "center" }}
        />
      </FlexColumn>
    </FlexColumn>
  );
}

export default OfflinePage;
