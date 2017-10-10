import {Component} from 'react'
import h from 'react-hyperscript'
import {connect} from 'react-redux'
import {isHexPrefixed} from 'ethereumjs-util'
import CopyButton from './copyButton'
import QrCode from './qr-code'

function mapStateToProps (state) {
  return {
    Qr: state.appState.Qr,
    buyView: state.appState.buyView,
    warning: state.appState.warning,
  }
}

class QrView extends Component {
  render () {
    const props = this.props
    const Qr = props.Qr
    const address = `${isHexPrefixed(Qr.data) ? 'ethereum:' : ''}${Qr.data}`
    return h('.main-container.flex-column', {
      key: 'qr',
      style: {
        justifyContent: 'center',
        paddingBottom: '45px',
        paddingLeft: '45px',
        paddingRight: '45px',
        alignItems: 'center',
      },
    }, [
      Array.isArray(Qr.message) ? h('.message-container', this.renderMultiMessage()) : h('.qr-header', Qr.message),

      this.props.warning ? this.props.warning && h('span.error.flex-center', {
        style: {
          textAlign: 'center',
          width: '229px',
          height: '82px',
        },
      },
      this.props.warning) : null,

      h(QrCode, {content: address}),

      h('.flex-row', [
        h('h3.ellip-address', {
          style: {
            width: '247px',
          },
        }, Qr.data),
        h(CopyButton, {
          value: Qr.data,
        }),
      ]),
    ])
  }

  renderMultiMessage () {
    var Qr = this.props.Qr
    var multiMessage = Qr.message.map((message) => h('.qr-message', message))
    return multiMessage
  }
}

export default connect(mapStateToProps, null)(QrView)

