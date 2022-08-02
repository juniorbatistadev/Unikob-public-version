import FlexColumn from "@components/common/FlexColumn";
import FlexRow from "@components/common/FlexRow";
import GoBackButton from "@components/common/GoBackButton";
import Title from "@components/common/Title";
import ContactForm from "@components/ContactForm";
import Head from "next/head";

function Contact() {
  return (
    <FlexColumn>
      <Head>
        <title>Escribenos - Unikob</title>
      </Head>

      <FlexRow alignItems={"center"}>
        <GoBackButton />
        <Title text="Escribenos" />
      </FlexRow>
      <ContactForm />
    </FlexColumn>
  );
}

export default Contact;
