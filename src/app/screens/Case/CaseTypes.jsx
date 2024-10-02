import { CaseView } from "./CaseView";
import { CASE_PATHS } from "../../../common/types";

// Historial de Reclamos
export const AllClaims = () => {
    return <CaseView title="Historial Reclamos" casePath={CASE_PATHS.ALL_CLAIMS} caseType="claims" />;
};

// Mis Reclamos
export const MyClaims = () => {
    const operatorName = 'user999';
    return <CaseView title="Mis Reclamos" casePath={CASE_PATHS.MY_CLAIMS} operatorName={operatorName} caseType="claims" />;
};

// Historial de Mediaciones
export const AllArbitrations = () => {
    return <CaseView title="Historial Mediaciones" casePath={CASE_PATHS.ALL_ARBITRATIONS} caseType="arbitrations" />;
};

// Mis Mediaciones
export const MyArbitrations = () => {
    const operatorName = 'user999';
    return <CaseView title="Mis Mediaciones" casePath={CASE_PATHS.MY_ARBITRATIONS} operatorName={operatorName} caseType="arbitrations" />;
};