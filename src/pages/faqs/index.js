import { graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'

import site from '../../../config/site'

const metaImage = site.image
const FaqsPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout>
    <SEO
      title={`Frequently asked questions | ${site.titleAlt}`}
      path="/faqs/"
      description="Because no one likes to repeat things here's a compilation
      of answers to questions I'm often asked."
      metaImage={metaImage}
    />
    <h1>Frequently asked questions</h1>
    <p>
      Did I leave something out that you were looking for an answer to? Feel
      free to reach out and <Link to="/contact/">ask me</Link>.
    </p>
    <ul>
      {edges.map(faq => (
        <li key={faq.node.id}>
          <Link to={faq.node.frontmatter.path}>
            {faq.node.frontmatter.title}
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

FaqsPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query FaqsQuery {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/pages/faqs/" }
        fields: { sourceName: { ne: "comments" } }
        frontmatter: { published: { ne: false }, output: { ne: false } }
      }
      sort: { fields: [frontmatter___order], order: ASC }
    ) {
      edges {
        node {
          id
          frontmatter {
            path
            title
          }
          fileAbsolutePath
        }
      }
    }
  }
`

export default FaqsPage