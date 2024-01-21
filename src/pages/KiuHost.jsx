import React from 'react'
import KiuHHeader from '../components/kiuhhheader/KiuHHeader'
import HostCard from '../components/hostBoardCard/HostCard'
import KiuHFooter from '../components/kiuhfooter/KiuHFooter'

export default function KiuHost() {
  const header_data = {
    h1: "BEST PLACE TO ENGAGE IN KIU ECOSYSTEM",
    p: "Curabitur augue sem, mollis vel purus sit amet, elementum molestie urna. Vivamus felis orci.",
    href: "/addProduct",
    img: "host",
    buttonText : "ADD UR PRODUCT",
    for: 'host',
  }
  const footer_data = {
    h1 : "Want To Find People For Your New Startup?",
    href : "/kiuHelp"
  }
  return (
    <div>
      <KiuHHeader header_data = {header_data} />
      <HostCard />
      <KiuHFooter footer_data = {footer_data} />
    </div>
  )
}
