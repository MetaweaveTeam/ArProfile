import { Container, Link, Row } from "@nextui-org/react";
import { useContext } from 'react';
import ctx from '../../utils/ctx';

function Using() {
  const {theme} = useContext(ctx);
  const images = [
    {
      name: "ArCode",
      url: "https://arcode.studio/",
      image: "https://arweave.net/Hv5LYvZtqGXI02EBGhT7Bk_yW0DCIEqZn-D41Ql3JSU",
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
      name: "Public Square",
      url: "", // TODO: Add URL
      image: "https://arweave.net/OFu9XH1SvFgCfYH1vySrTFkObor2jl65SgaXrOHiQVA",
      imageDark: "",
    },
    {
      name: "QuackerApp",
      url: "", // TODO: Add URL
      image: "https://arweave.net/lOc_hyCxQdTOLDB8MPI8n2n0mZ-JlXoRgZ_fyNI0cyk",
      imageDark: "",
    },
    {
      name: "Narrative",
      url: "", // TODO: Add URL
      image: "https://arweave.net/Ex8fhA04tdwHSMbcddgNOVgczmmlXLnxuAioiuosc8c",
      imageDark: "https://arweave.net/esU7vUgQ1AHmxJJKK7ZJkbdavNmlbWdN2KZhg5CWxGA",
    }
  ];
  return(<>
    <Container display="flex">
      <Row wrap="wrap" justify="space-around" gap={2}>
        {images.map((i,j) => (
          <Link key={j} href={i.url} target="_blank" rel="noreferrer" style={{padding: '5px'}}>
            <img src={theme && i.imageDark ? i.imageDark : i.image} height="50px" alt={`${i.name} logo`} />
          </Link>
        ))}
        </Row>
    </Container>
  </>);
}

export default Using;
