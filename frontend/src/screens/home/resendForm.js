import React from "react";
import { Text, useTheme, Card } from "@ui-kitten/components";
import { useAuth } from "../auth/utils/authProvider";
import { AppRoute } from "../../navigation/app-routes";
import customStyle from "../../../themes/styles";

const ResendForm = ({ navigation }) => {
  return (
    <Card status="danger" testID="resendForm" style={{marginBottom: 15}}>
      <Text>
        Uh oh! Looks like your verification request has been rejected but you
        can send another request{" "}
        <Text
          testID="resendLink"
          style={{textDecorationLine: 'underline'}}
          status="primary"
          accessibilityRole="button"
          onPress={() => navigation.navigate(AppRoute.DOCTOR_FORM)}
        >
         here.
        </Text>
      </Text>
    </Card>
  );
};

export default ResendForm;
