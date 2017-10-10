import {Component} from 'react'
import h from 'react-hyperscript'
import {qrcode} from 'qrcode-npm'

export default class QrCode extends Component {
  render () {
    const props = this.props
    const content = props.content
    const qrImage = qrcode(4, 'M')
    qrImage.addData(content)
    qrImage.make()

    return h('#qr-container.flex-column', {
      style: {
        marginTop: '25px',
        marginBottom: '15px',
      },
      dangerouslySetInnerHTML: {
        __html: qrImage.createTableTag(4),
      },
    })
  }
}
