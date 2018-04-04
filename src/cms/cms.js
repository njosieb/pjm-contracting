import CMS from 'netlify-cms'
import ProjectTemplate from '../templates/project'
import PortfolioPagePreview from './PortfolioPagePreview'

// CMS.registerPreviewStyle("/styles.css");
CMS.registerPreviewTemplate(ProjectTemplate)
CMS.registerPreviewTemplate(PortfolioPagePreview)
