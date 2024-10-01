import { CaseView } from "./CaseView";

// Historial de Reclamos
export const AllClaims = () => {
    return <CaseView title="Historial Reclamos" path="all-claims" caseType="claims" />;
};

// Mis Reclamos
export const MyClaims = () => {
    const operatorName = 'user999';
    return <CaseView title="Mis Reclamos" path="my-claims" operatorName={operatorName} caseType="claims" />;
};

// Historial de Mediaciones
export const AllArbitrations = () => {
    return <CaseView title="Historial Mediaciones" path="all-arbitrations" caseType="arbitrations" />;
};

// Mis Mediaciones
export const MyArbitrations = () => {
    const operatorName = 'user999';
    return <CaseView title="Mis Mediaciones" path="my-arbitrations" operatorName={operatorName} caseType="arbitrations" />;
};