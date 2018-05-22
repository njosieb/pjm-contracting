import CMS from 'netlify-cms'
import 'netlify-cms/dist/cms.css'
import PortfolioPagePreview from './PortfolioPagePreview'
import ProjectPreview from './ProjectPreview'

CMS.registerPreviewStyle('/styles.css')
CMS.registerPreviewTemplate(ProjectPreview)
CMS.registerPreviewTemplate(PortfolioPagePreview)
