import { Grid, Image, theme } from "@nextui-org/react";
import { useContext } from 'react';
import ctx from '../../utils/ctx';

function Using() {
  const {theme} = useContext(ctx);
  const images = [
    {
      name: "ArProfile",
      url: "https://arprofile.org/",
      image: "https://arweave.net/zRHY7Gask1nWroictBm3MEqqq1yeqtrQ2OwoacUXsZA",
      imageDark: "",
    },
    {
      name: "ArCode",
      url: "https://arcode.studio/",
      image: "https://arweave.net/Hv5LYvZtqGXI02EBGhT7Bk_yW0DCIEqZn-D41Ql3JSU",
      imageDark: "",
    },
    {
      name: "ArConnect",
      url: "https://arconnect.io",
      image: "https://arweave.net/_ANb4DQBuXAI3dBBWVJhgs0tr6eoipGnfOquaSFBmkc",
      imageDark: "",
    },
    {
      name: "ArWiki",
      url: "https://arwiki.wiki/",
      image: "https://arweave.net/3uxXjEum-uwos2ST19TaTBPtFdtdoPtrTjWCFfy3wm8",
      imageDark: "",
    },
    {
      name: "Metaweave",
      url: "https://metaweave.xyz/",
      image: "https://arweave.net/jxURfw-kx2FjpKOobdV41GfkysQppCgXGcmcF3-S3cI",
      imageDark: "",
    },
    {
      name: "Permanotes",
      url: "https://permanotes.app/",
      image: "https://arweave.net/H3F-J09Bo6jkxkZK-4jd82wgaomHo2bTw8tZ07VbiVE",
      imageDark: "",
    },
    {
      name: "Permapages",
      url: "https://pages.arweave.dev/",
      image: "https://arweave.net/GxrMJdUE6SXlOAyNradmXteQZsKy1vFByRrgeG6BNxg",
      imageDark: "",
    },
    {
      name: "Stamps",
      url: "", // TODO: Add URL
      image: "https://arweave.net/v-9W766HEXzy6FNJ3ug2gSMla261Je7-joXsYq7epYc",
      imageDark: "",
    },
    {
      name: "Permamail",
      url: "https://permamail.app/",
      image: "https://arweave.net/5H8cnvDCIo309uvMrylMbgI_7TX-Bpb_Q_ECFpFOG0I",
      imageDark: "",
    },
    {
      name: "Wavehub",
      url: "", // TODO: Add URL
      image: "https://arweave.net/2dP-_mZsou6EHgUNR8jyrdqh9KLkw_cWYWGdFS7rHcA",
      imageDark: "https://arweave.net/budlMdULr9phyaeGVtLfTnGexk4t8iSmYNCLTdboexc",
    },
    {
      name: "PublicSquareColor",
      url: "", // TODO: Add URL
      image: "https://arweave.net/OFu9XH1SvFgCfYH1vySrTFkObor2jl65SgaXrOHiQVA",
      imageDark: "",
    },
    {
      name: "Narrative",
      url: "", // TODO: Add URL
      image: "https://arweave.net/EbKnok8ms1vTAtZw15JaNVjY4inJsSsyWQeA-GR_i3U",
      imageDark: "",
    },
    {
      name: "QuackerApp",
      url: "", // TODO: Add URL
      image: "https://arweave.net/lOc_hyCxQdTOLDB8MPI8n2n0mZ-JlXoRgZ_fyNI0cyk",
      imageDark: "",
    },
    {
      name: "Multiwallet",
      url: "", // TODO: Add URL
      image: "https://arweave.net/1FRd_VRd2Zvkv9DI6LSowgTK3jqTwbUXAMd6NTJ2fi0",
      imageDark: "",
    },
    {
      name: "Arweave",
      url: "https://arweave.org/",
      image: "https://arweave.net/pzSXvJQ-F9bBRuzYfrdDRUu_QmRtP1LO3IZro16kKIQ",
      imageDark: "https://arweave.net/3uEZeT6rxgeuzeYUrlejQBljzT6GeiwoHwG8xMofueI",
    },
  ];
  return(<>
    <Grid.Container gap={2} justify="center">
      {images.map((i) => (
        <Grid xs={3} key={i.name}>
          <a href={i.url} target="_blank" rel="noreferrer">
            <Image src={theme && i.imageDark ? i.imageDark : i.image} width="100%" height="100px" />
          </a>
        </Grid>
      ))}
    </Grid.Container>
  </>);
}

export default Using;
