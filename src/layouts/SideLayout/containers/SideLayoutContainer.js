import { connect } from 'react-redux';
import { navToggleAction } from './../modules/SideLayoutModule';
import SideLayoutComponent from './../components/SideLayoutComponent'

const mapStateToProps = (state) => ({
  navToggle: state.navToggle,
})

const mapDispatchToProps = dispatch => ({
  navToggleAction: navToggle => dispatch( navToggleAction(navToggle) ),
})

export default connect(mapStateToProps, mapDispatchToProps)(SideLayoutComponent);
