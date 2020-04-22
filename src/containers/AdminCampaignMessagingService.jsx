import PropTypes from "prop-types";
import React from "react";
import loadData from "./hoc/load-data";
import { withRouter } from "react-router";
import gql from "graphql-tag";
import theme from "../styles/theme";
import DisplayLink from "../components/DisplayLink";
import wrapMutations from "./hoc/wrap-mutations";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  container: {
    ...theme.layouts.multiColumn.container,
    marginBottom: 40,
    justifyContent: "space-around",
    flexWrap: "wrap"
  },
  header: {
    ...theme.text.header
  }
});

class AdminCampaignMessagingService extends React.Component {
  render() {
    const campaign = this.props.data.campaign;
    const messagingServiceUrl = `https://www.twilio.com/console/sms/services/${campaign.messagingServiceSid}/`;
    return (
      <div>
        <div className={css(styles.header)}>
          {campaign.title}
          <br />
          Campaign ID: {campaign.id}
          <br />
          <DisplayLink
            url={messagingServiceUrl}
            textContent={"Messaging Service URL:"}
          />
        </div>
      </div>
    );
  }
}

AdminCampaignMessagingService.propTypes = {
  params: PropTypes.object,
  messagingService: PropTypes.object,
  router: PropTypes.object,
  organizationId: PropTypes.string,
  campaignId: PropTypes.string,
  data: PropTypes.object
};

const mapQueriesToProps = ({ ownProps }) => ({
  data: {
    query: gql`
      query getCampaign($campaignId: String!) {
        campaign(id: $campaignId) {
          id
          title
          messagingServiceSid
        }
      }
    `,
    variables: {
      organizationId: ownProps.params.organizationId,
      campaignId: ownProps.params.campaignId
    },
    forceFetch: true
  }
});

export default loadData(
  wrapMutations(withRouter(AdminCampaignMessagingService)),
  {
    mapQueriesToProps
  }
);
