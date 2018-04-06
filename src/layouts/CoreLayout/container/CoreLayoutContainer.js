import { connect } from 'react-redux';
import { menuToggle } from './../modules/coreLayout';
import CoreLayout from './../components/CoreLayout'

const mapStateToProps = (state) => ({
  collapsed: state.collapsed,
})

const mapDispatchtoProps = {
  menuToggle,
}

export default connect(mapStateToProps, mapDispatchtoProps)(CoreLayout);
