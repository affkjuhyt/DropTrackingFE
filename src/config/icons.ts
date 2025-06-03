import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUser,
  faShoppingCart,
  faBox,
  faChartLine,
  faCog,
  faSignOutAlt,
  faPlus,
  faEdit,
  faTrash,
  faSearch,
  faFilter,
  faSort,
  faCheck,
  faTimes,
  faExclamationCircle,
  faInfoCircle,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faTwitter,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

// Add icons to library for global use
library.add(
  // Solid icons
  faUser,
  faShoppingCart,
  faBox,
  faChartLine,
  faCog,
  faSignOutAlt,
  faPlus,
  faEdit,
  faTrash,
  faSearch,
  faFilter,
  faSort,
  faCheck,
  faTimes,
  faExclamationCircle,
  faInfoCircle,
  faSpinner,
  // Brand icons
  faGithub,
  faTwitter,
  faLinkedin
);

// Icon type definitions
export type IconName =
  | 'user'
  | 'shopping-cart'
  | 'box'
  | 'chart-line'
  | 'cog'
  | 'sign-out-alt'
  | 'plus'
  | 'edit'
  | 'trash'
  | 'search'
  | 'filter'
  | 'sort'
  | 'check'
  | 'times'
  | 'exclamation-circle'
  | 'info-circle'
  | 'spinner'
  | 'github'
  | 'twitter'
  | 'linkedin';