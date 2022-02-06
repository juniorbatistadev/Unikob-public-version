import Link from "next/link";

export default function A({ href, children }) {
  return (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  );
}
