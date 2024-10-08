import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

const JsonViewer = ({ json }) => {
	return (
		<div className="p-4 bg-base-100 text-primary rounded-lg h-full">
			<SyntaxHighlighter
				language="json"
				style={darcula}
				wrapLongLines={true}
				wrapLines={true}
				customStyle={{ wordBreak: "break-all" }}
				className="overflow-auto max-h-full overflow-x-hidden"
			>
				{JSON.stringify(json, null, 2)}{" "}
			</SyntaxHighlighter>
		</div>
	);
};

export default JsonViewer;
