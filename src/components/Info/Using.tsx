import { Grid, Image } from "@nextui-org/react";

function Using() {
  const images = [
    {
      name: "ArProfile",
      url: "https://arprofile.org/",
      image: "https://arweave.net/zRHY7Gask1nWroictBm3MEqqq1yeqtrQ2OwoacUXsZA",
    },
    {
      name: "ArCode",
      url: "https://arcode.studio/",
      image: "https://arweave.net/Hv5LYvZtqGXI02EBGhT7Bk_yW0DCIEqZn-D41Ql3JSU",
    },
    {
      name: "ArConnect",
      url: "https://arconnect.io",
      image: "https://arweave.net/_ANb4DQBuXAI3dBBWVJhgs0tr6eoipGnfOquaSFBmkc",
    },
    {
      name: "ArWiki",
      url: "https://arwiki.wiki/",
      image: "https://arweave.net/3uxXjEum-uwos2ST19TaTBPtFdtdoPtrTjWCFfy3wm8",
    },
    {
      name: "Metaweave",
      url: "https://metaweave.xyz/",
      image: "https://arweave.net/jxURfw-kx2FjpKOobdV41GfkysQppCgXGcmcF3-S3cI",
    },
    {
      name: "Permanotes",
      url: "https://permanotes.app/",
      image: "https://arweave.net/H3F-J09Bo6jkxkZK-4jd82wgaomHo2bTw8tZ07VbiVE",
    },
    {
      name: "Permapages",
      url: "https://pages.arweave.dev/",
      image: "https://arweave.net/GxrMJdUE6SXlOAyNradmXteQZsKy1vFByRrgeG6BNxg",
    },
    {
      name: "Stamps",
      url: "", // TODO: Add URL
      image: "https://arweave.net/v-9W766HEXzy6FNJ3ug2gSMla261Je7-joXsYq7epYc",
    },
    {
      name: "Permamail",
      url: "https://permamail.app/",
      image: "https://arweave.net/5H8cnvDCIo309uvMrylMbgI_7TX-Bpb_Q_ECFpFOG0I"
    },
    {
      name: "Wavehub",
      url: "", // TODO: Add URL
      image: "https://arweave.net/2dP-_mZsou6EHgUNR8jyrdqh9KLkw_cWYWGdFS7rHcA"
    },
    {
      name: "PublicSquareColor",
      url: "", // TODO: Add URL
      image: "https://arweave.net/OFu9XH1SvFgCfYH1vySrTFkObor2jl65SgaXrOHiQVA"
    },
    {
      name: "Narrative",
      url: "", // TODO: Add URL
      image: "https://arweave.net/EbKnok8ms1vTAtZw15JaNVjY4inJsSsyWQeA-GR_i3U",
    },
    {
      name: "QuackerApp",
      url: "", // TODO: Add URL
      image: "https://arweave.net/lOc_hyCxQdTOLDB8MPI8n2n0mZ-JlXoRgZ_fyNI0cyk",
    },
    {
      name: "Multiwallet",
      url: "", // TODO: Add URL
      image: "https://arweave.net/1FRd_VRd2Zvkv9DI6LSowgTK3jqTwbUXAMd6NTJ2fi0",
    },
    {
      name: "Arweave",
      url: "https://arweave.org/",
      image: "https://arweave.net/htbalfMsXKYBD_F2OQuXGd2ZvLaYsSY1cpJrJzBhI9I",
    },
  ];
  return(<>
    <Grid.Container gap={2} justify="center">
      {images.map((i) => (
        <Grid xs={3} key={i.name}>
          <a href={i.url} target="_blank" rel="noreferrer">
            <Image src={i.image} width="100%" height="100px" />
          </a>
        </Grid>
      ))}
    </Grid.Container>
  </>);
}

export default Using;
