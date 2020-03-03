import React from 'react';
import { StaticQuery, graphql, Link } from "gatsby"
import Measure from 'react-measure';
import classnames from 'classnames';
import './sidenav.scss';


const Sidenav = ({result}) => {
  const [top, setTop] = React.useState(0)

  return (
    <Measure bounds={true} onResize={rect => setTop(rect.bounds.top)}>
      {({measureRef}) => (
        <div
          ref={measureRef}
          className={classnames("position-sticky", "sidenav", "bg-gray-light")}
          style={{
            top: top,
            height: `calc(100vh - ${top}px)`
          }}
        >
          <div className="border-right height-full overflow-auto">
          <StaticQuery
            query={graphql`
              query SiteQuery {
                site {
                  siteMetadata {
                    title
                    menuLinks {
                      name
                      link
                      children {
                        name
                        link
                      }
                    }
                  }
                }
              }
            `}
            render={data => {
              const { site } = data
              const { siteMetadata } = site
              const { menuLinks } = siteMetadata;
              return (
                <div>
                  {menuLinks.map((link, index) => {
                    return (
                      <div className={classnames("p-4", {
                        "border-top": index !== 0
                      })}>
                        <div key={link.name} className="mt-2">
                          <Link
                            className="d-block h4 text-gray-dark"
                            to={link.link}
                            activeClassName="text-gray-dark text-bold"
                            partiallyActive={true}
                          >
                            {link.name}
                          </Link>
                          { link.children && 
                          <div className="mt-2 d-flex flex-column">
                            {link.children.map((child) => (
                              <Link
                                className="pt-1 pb-1 mt-2 d-block h5"
                                to={child.link}
                                activeClassName="text-gray-dark text-bold"
                                partiallyActive={true}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                          }
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            }}
          />
          </div>
        </div>
      )}
    </Measure>
  )
}

export default Sidenav;
