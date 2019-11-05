import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { formatDistance } from 'date-fns'

import style from '../styles/Document.module.css'

const _ = require('lodash-addons')

const Document = ({
  title,
  hideMeta,
  datePublished,
  dateModified,
  image,
  author,
  timeToRead,
  toc,
  tableOfContents,
  tags,
  html,
}) => {
  return (
    <article className={`${style.document} h-entry`}>
      <div className={style.title}>
        <h1 className={`${style.heading} p-name`}>{title}</h1>
        <div className={style.meta} style={{ display: hideMeta && `none` }}>
          <span>
            {author && (
              <>
                {dateModified ? `Updated` : `Published`}{' '}
                <span style={{ display: 'none' }}>
                  by{' '}
                  <a className="p-author h-card" href={author.url}>
                    {author.name}
                  </a>
                </span>
              </>
            )}
            {datePublished && (
              <span style={{ display: dateModified && `none` }}>
                {' '}
                <time className="dt-published" dateTime={datePublished}>
                  {formatDistance(new Date(datePublished), new Date(), {
                    addSuffix: true,
                  })}
                </time>
              </span>
            )}
            {dateModified && (
              <>
                {' '}
                <time className="dt-updated" dateTime={dateModified}>
                  {formatDistance(new Date(dateModified), new Date(), {
                    addSuffix: true,
                  })}
                </time>
              </>
            )}
          </span>
          {timeToRead && (
            <span className={style.readTime}>
              {timeToRead}&nbsp;min&nbsp;read
            </span>
          )}
          {tags ? (
            <div className={style.tags}>
              {tags.map(tag => (
                <Link
                  className={style.tag}
                  to={`/tag/${_.slugify(tag)}/`}
                  key={_.slugify(tag)}
                >
                  <span>#{tag}</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {image && (
        <Img fluid={image.childImageSharp.fluid} className={style.cover} />
      )}

      {toc && (
        <nav
          className={`${style.toc}`}
          dangerouslySetInnerHTML={{ __html: tableOfContents }}
        />
      )}

      <div
        className={`${style.content} e-content`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  )
}

Document.propTypes = {
  title: PropTypes.string,
  hideMeta: PropTypes.bool,
  datePublished: PropTypes.string,
  dateModified: PropTypes.string,
  image: PropTypes.object,
  author: PropTypes.object,
  timeToRead: PropTypes.number,
  toc: PropTypes.bool,
  tableOfContents: PropTypes.string,
  html: PropTypes.string,
  tags: PropTypes.array,
}

export default Document
