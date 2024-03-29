import { useContext, useEffect } from "react";
import { Context } from "../..";
import MacCodeBlock from "../../../../common/mac-code-block";
import "highlight.js/styles/vs2015.css";
import json from "highlight.js/lib/languages/json";
import hljs from "highlight.js";
import { CopyOutlined } from "@ant-design/icons";
import { message } from "antd";
import convert from "../../../../utils/proxy";
import styleNative from "./style.module.scss";
import copy from "../../../../utils/copy";

hljs.registerLanguage("json", json);

function Json(prop: { nodeName: string }) {
  const getAllNodesMetricsData = useContext(Context);
  const style = convert<typeof styleNative>(styleNative);
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const data: typeof getAllNodesMetricsData = {};
  if (prop.nodeName === "node00") data["node00"] = getAllNodesMetricsData["node00"];
  else {
    for (const key of Object.keys(getAllNodesMetricsData)) {
      if (key === "node00") continue;
      data[key] = getAllNodesMetricsData[key];
    }
  }
  return (
    <div className={style.jsonWrapper}>
      <MacCodeBlock>
        <div className={style.macCodeBlockWrapper}>
          <div 
            style={{
              position: "fixed",
              top: "40px",
              right: "30px",
              fontSize: "25px",
              cursor: "pointer",
            }}
            onClick={() => copy(JSON.stringify(data, null, 2)).
                then(() => message.success("已拷贝 Node 均值信息到剪切板"))}
          ><CopyOutlined/></div>
          <pre>
            <code className="language-json" style={{ fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace" }}>
              {
                JSON.stringify(data, null, 2)
              }
            </code>
          </pre>
        </div>
      </MacCodeBlock>
    </div>
  );
}

export default Json;