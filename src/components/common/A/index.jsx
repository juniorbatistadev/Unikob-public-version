import Link from "next/link";

export default function A({ href, children, ...props }) {
  return (
    <>
      {href ? (
        <Link href={href}>
          <a {...props}>{children}</a>
        </Link>
      ) : (
        children
      )}
    </>
  );
}
