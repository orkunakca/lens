import "./cluster-icon.scss";

import React, { DOMAttributes } from "react";
import { observer } from "mobx-react";
import { Params as HashiconParams } from "@emeraldpay/hashicon";
import { Hashicon } from "@emeraldpay/hashicon-react";
import { cssNames, IClassName } from "../../utils";
import { Badge } from "../badge";
import { Tooltip } from "../tooltip";
import { ClusterRenderInfo } from "../../../common/cluster-store";
import { Icon } from "../icon";

interface Props extends DOMAttributes<HTMLElement> {
  cluster: ClusterRenderInfo;
  className?: IClassName;
  errorClass?: IClassName;
  showErrors?: boolean;
  showTooltip?: boolean;
  interactive?: boolean;
  isActive?: boolean;
  options?: HashiconParams;
}

const defaultProps: Partial<Props> = {
  showErrors: true,
  showTooltip: true,
};

@observer
export class ClusterIcon extends React.Component<Props> {
  static defaultProps = defaultProps as object;

  render() {
    const {
      cluster, showErrors, showTooltip, errorClass, options, interactive, isActive, className,
      children, ...elemProps
    } = this.props;
    const { isAdmin, name, eventCount, preferences: { icon }, id: clusterId, DeadError } = cluster;
    const clusterIconId = `cluster-icon-${clusterId}`;
    const isDead = !!DeadError;
    const classNames = cssNames("ClusterIcon flex inline", className, {
      interactive: interactive ?? !!this.props.onClick,
      active: isActive,
    });
    return (
      <div {...elemProps} className={classNames} id={showTooltip ? clusterIconId : null}>
        {showTooltip && (
          <Tooltip targetId={clusterIconId}>{name}</Tooltip>
        )}
        {icon
          ? <img src={icon} alt={name} />
          : <Hashicon value={clusterId} options={options} />
        }
        {isDead && (
          <Icon className="dead-error" material="error" />
        )}
        {showErrors && isAdmin && eventCount > 0 && (
          <Badge
            className={cssNames("events-count", errorClass)}
            label={eventCount >= 1000 ? Math.ceil(eventCount / 1000) + "k+" : eventCount}
          />
        )}
        {children}
      </div>
    );
  }
}
