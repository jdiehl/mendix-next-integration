import { useEffect } from "react";

async function loadMendixApp() {
  const response = await fetch('/index.html')
  const html = await response.text()
  const template = document.createElement('template')
  template.innerHTML = html

  // append styles
  for (const element of template.content.querySelectorAll('link')) {
    document.head.appendChild(element)
    console.log('element')
  }

  // append scripts
  for (const element of template.content.querySelectorAll('script')) {
    const script = document.createElement('script')
    const src = element.getAttribute('src')
    if (src) script.setAttribute('src', src)
    script.innerHTML = element.innerHTML
    document.body.appendChild(script)
  }
}

export default function Mendix() {
  useEffect(() => {
    loadMendixApp().catch (err => console.error(err))
  }, [])

  const style = {
    width: 400,
    height: 400,
  }

  return (
    <div style={style} id="content" />
  )
}