import React from 'react'
import KiuHHeader from '../components/kiuhhheader/KiuHHeader'
import KiuHFooter from '../components/kiuhfooter/KiuHFooter'
import HelpCard from '../components/helpBoardCard/HelpCard'

export default function KiuHelp() {
  const header_data = {
    h1: "dflsikfva;snlk ciewur bpwieru bwpe wpeiruv",
    p: "asinqsncqo;wrnpwoerinfwpoenvwpernn weprovnw eropvnweprovnw epovnwe rvwoenv",
    href: "/",
    img: "help",
    buttonText : "ADD UR PRODUCT",
    for: 'help',
  }

  const footer_data = {
    h1 : "Want To Buy/Sell Stuff On KIUHOST?",
    href : "/kiuHost"
  }

  return (
    <div>KiuHelp
      <KiuHHeader header_data={header_data} />
      <HelpCard />
      <KiuHFooter footer_data = {footer_data} />
    </div>
  )
}
