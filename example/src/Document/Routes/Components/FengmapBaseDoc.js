import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import { darcula } from 'react-syntax-highlighter/styles/prism'

import fengmapSDK from 'fengmap/build/fengmap.min-v2.1.23'
import { FengmapBase } from 'react-fengmap'

import PropsDoc from '../../../Components/PropsDoc'
import { getRouteDefinition } from '../../../helpers/view'

class FengmapBaseDoc extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  render() {
    const { location } = this.props
    const definition = getRouteDefinition(location.pathname)
    if (!definition) {
      return
    }

    return (
      <div>
        <h1>{definition.displayTitle}</h1>
        <p>{definition.description}</p>

        <h3>用法</h3>

        <SyntaxHighlighter language="jsx" style={darcula}>
          {`<FengmapBase mapOptions={MapOptions} events={Events} />`}
        </SyntaxHighlighter>

        <br />

        <PropsDoc
          data={[
            {
              prop: 'mapOptions',
              type: 'Object',
              description: (
                <React.Fragment>
                  请参考
                  <a href="https://www.fengmap.com/docs/js/v2.1.1_beta/classes/fengmap.MapOptions.html">
                    fengmap.MapOptions
                  </a>
                </React.Fragment>
              )
            },
            {
              prop: 'events',
              type: 'Object',
              description: (
                <React.Fragment>
                  键值组合，key的可用值： [
                  {[
                    'focusGroupIDChanged',
                    'loadComplete',
                    'mapClickNode',
                    'mapScaleLevelChanged',
                    'scaleLevelChanged',
                    'visibleGroupIDsChanged'
                  ].map((e, i) => {
                    return (
                      <span>
                        <code key={i} className="codeRef">
                          {e}
                        </code>
                        {i !== 5 ? ',' : ''}
                      </span>
                    )
                  })}
                  ]，value是事件响应函数
                </React.Fragment>
              )
            }
          ]}
        />

        <br />

        <div className="mapExample">
          <h3>示例</h3>
          <FengmapBase
            fengmapSDK={fengmapSDK}
            mapId="10347"
            mapOptions={{
              key: 'e843c6307e42ec8de24d14a10e07ca20',
              //开发者申请应用名称
              appName: 'github演示应用',
              mapServerURL: '/maps/10347',
              defaultMapScaleLevel: 20,
              defaultTiltAngle: 45
            }}
            events={{
              loadComplete(e) {
                alert('地图加载完毕')
              },
              mapClickNode(e) {
                alert(`你点击的FID是： [${e.FID}]`)
              }
            }}
            style={{
              width: '100%',
              height: '550px'
            }}
          />

          <br />

          <SyntaxHighlighter language="jsx" style={darcula}>
            {`import fengmapSDK from 'fengmap'
            
export default function Example() {
  return (
    <FengmapBase
      fengmapSDK={fengmapSDK}
      mapId="10347"
      mapOptions={{
        //开发者申请应用名称
        appName: '应用名',
        key: 'appkey',
        mapServerURL: '/maps/10347',
        defaultMapScaleLevel: 20,
        defaultTiltAngle: 45
      }}
      events={{
        loadComplete(e) {
          alert('地图加载完毕')
        },
        mapClickNode(e) {
          alert(\`你点击的FID是： [\${e.FID}]\`)
        }
      }}
      style={{
        width: '100%',
        height: '550px'
      }}
    />
  )
}
`}
          </SyntaxHighlighter>
        </div>
      </div>
    )
  }
}

export default withRouter(FengmapBaseDoc)