interface Props {
  seoTitle?: string;
  seoDescription?: string;
}

export default function Metadata({ seoTitle, seoDescription }: Props) {
  return (
    <>
      <title>{seoTitle ? seoTitle : "SPLT"}</title>
      <meta
        name="description"
        content={seoDescription ? seoDescription : "Simplifying Bill Splitting"}
      />
    </>
  );
}
