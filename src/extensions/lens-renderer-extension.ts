import type { AppPreferenceRegistration, ClusterFeatureRegistration, KubeObjectDetailRegistration, KubeObjectMenuRegistration, KubeObjectStatusRegistration, PageMenuRegistration, PageRegistration, StatusBarRegistration, } from "./registries"
import { observable } from "mobx";
import { LensExtension } from "./lens-extension"
import { getExtensionPageUrl } from "./registries/page-registry"

export class LensRendererExtension extends LensExtension {

  /**
   * @observable
   */
  @observable.shallow globalPages: PageRegistration[] = []

  /**
   * @observable
   */
  @observable.shallow clusterPages: PageRegistration[] = []

  /**
   * @observable
   */
  @observable.shallow globalPageMenus: PageMenuRegistration[] = []

  /**
   * @observable
   */
  @observable.shallow clusterPageMenus: PageMenuRegistration[] = []

  /**
   * @observable
   */
  @observable.shallow kubeObjectStatusTexts: KubeObjectStatusRegistration[] = []

  /**
   * @observable
   */
  @observable.shallow appPreferences: AppPreferenceRegistration[] = []

  /**
   * @observable
   */
  @observable.shallow clusterFeatures: ClusterFeatureRegistration[] = []

  /**
   * @observable
   */
  @observable.shallow statusBarItems: StatusBarRegistration[] = []

  /**
   * @observable
   */
  @observable.shallow kubeObjectDetailItems: KubeObjectDetailRegistration[] = []

  /**
   * @observable
   */
  @observable.shallow kubeObjectMenuItems: KubeObjectMenuRegistration[] = []

  async navigate<P extends object>(pageId?: string, params?: P) {
    const { navigate } = await import("../renderer/navigation");
    const pageUrl = getExtensionPageUrl({
      extensionId: this.name,
      pageId: pageId,
      params: params ?? {}, // compile to url with params
    });
    navigate(pageUrl);
  }
}
