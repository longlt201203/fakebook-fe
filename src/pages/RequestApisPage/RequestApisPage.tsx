import { PropsWithChildren } from "react";
import apiData from "../../../api-mapping.json";
import "./RequestApisPage.css";

interface RequestApiEndpointComponentProps {
    status?: string;
    title: string;
    description?: string;
    method: string;
    path: string;
    contentType?: string;
    requestBodyExample?: any;
    responseBodyExample?: any;
    requestHeadersExample?: any;
    requestQueryExample?: any;
    allowedRoles?: string[];
}

const RequestApiEndpointComponent = (props: PropsWithChildren<RequestApiEndpointComponentProps>) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <h4><span className="method">{props.method}</span> {props.path} {props.status && <span className={`status ${props.status.toLowerCase()}`}>{props.status}</span>}</h4>
            {props.description ? <p>{props.description}</p> : ''}
            {props.contentType ? <>
                <h5>Content Type:</h5>
                <p>{props.contentType}</p>
            </> : ''}
            {props.requestHeadersExample ? <>
                <h5>Request Headers Example:</h5>
                <pre>{JSON.stringify(props.requestHeadersExample, null, 2)}</pre>
            </> : ''}
            {props.requestQueryExample ? <>
                <h5>Request Query Example:</h5>
                <pre>{JSON.stringify(props.requestQueryExample, null, 2)}</pre>
            </> : ''}
            {props.requestBodyExample ? <>
                <h5>Request Example:</h5>
                <pre>{JSON.stringify(props.requestBodyExample, null, 2)}</pre>
            </> : ''}
            {props.responseBodyExample ? <>
                <h5>Response Example:</h5>
                <pre>{JSON.stringify(props.responseBodyExample, null, 2)}</pre>
            </> : ''}
            {props.allowedRoles ? <>
                <h5>Allowed Roles:</h5>
                <ul className="allowed-roles-list">
                {props.allowedRoles.map(role => <li key={role} className={role === 'admin' ? 'admin-role' : ''}>{role}</li>)}
                </ul>
            </> : ''}
        </div>
    )
}

const RequestApiComponent = (props: PropsWithChildren<{
    title: string,
    endpoints: RequestApiEndpointComponentProps[]
}>) => {
    return (
        <div className="request-apis-container">
            <h2>{props.title}</h2>
            {props.endpoints.map(item => (
                <>
                    <RequestApiEndpointComponent
                        status={item.status}
                        method={item.method}
                        path={item.path}
                        title={item.title}
                        description={item.description}
                        contentType={item.contentType}
                        requestBodyExample={item.requestBodyExample}
                        responseBodyExample={item.responseBodyExample}
                        requestHeadersExample={item.requestHeadersExample}
                        allowedRoles={item.allowedRoles}
                        requestQueryExample={item.requestQueryExample} />
                    <hr />
                </>
            ))}
        </div>
    );
}

export const RequestApisPage = () => {
    return (
        <div>
            <h1>Request APIs</h1>
            <hr />
            {apiData.map(item => (
                <>
                    <RequestApiComponent
                        title={item.title}
                        endpoints={item.endpoints}
                    />
                    <hr />
                </>
            ))}
        </div>
    );
}