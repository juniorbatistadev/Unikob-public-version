import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import Title from "@components/common/Title";
import ContactForm from "@components/ContactForm";

function Contact() {
  return (
    <FlexColumn>
      <FlexRow alignItems={"center"}>
        <GoBackButton />
        <Title text="Escribenos" />
      </FlexRow>
      <ContactForm />
    </FlexColumn>
  );
}

export default Contact;
