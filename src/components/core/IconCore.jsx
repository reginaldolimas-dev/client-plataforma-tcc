import _ from "lodash";
import * as AntdIcons from "react-icons/ai";
import * as BoxIcons from "react-icons/bi";
import * as BootstrapIcons from "react-icons/bs";
import * as CircumIcons from "react-icons/ci";
import * as Devicons from "react-icons/di";
import * as FontAwesomeIcons from "react-icons/fa";
import * as FontAwesome6Icons from "react-icons/fa6";
import * as FeatherIcons from "react-icons/fi";
import * as GameIcons from "react-icons/gi";
import * as GrommetIcons from "react-icons/gr";

import * as CssIcons from "react-icons/cg";
import * as HeroIcons from "react-icons/hi";
import * as IonIcons from "react-icons/io";
import * as Ionicons5 from "react-icons/io5";
import * as LucideIcon from "react-icons/lu";
import * as MaterialDesignIcons from "react-icons/md";
import * as PhosphorIcon from "react-icons/pi";
import * as RemixIcon from "react-icons/ri";
import * as SimpleIcons from "react-icons/si";
import * as SimpleLineIcon from "react-icons/sl";
import * as TablerIcon from "react-icons/tb";
import * as ThemifyIcons from "react-icons/tfi";
import * as VscIcon from "react-icons/vsc";
import Icon from "@ant-design/icons";

const iconLibraries = {
    ai: AntdIcons,
    bs: BootstrapIcons,
    bi: BoxIcons,
    ci: CircumIcons,
    di: Devicons,
    fi: FeatherIcons,
    fa6: FontAwesome6Icons,
    fa: FontAwesomeIcons,
    gi: GameIcons,
    gr: GrommetIcons,
    ri: RemixIcon,
    io5: Ionicons5,
    tb: TablerIcon,
    md: MaterialDesignIcons,
    pi: PhosphorIcon,
    cg: CssIcons,
    hi: HeroIcons,
    io: IonIcons,
    si: SimpleIcons,
    vsc: VscIcon,
    tfi: ThemifyIcons,
    lu: LucideIcon,
    sl: SimpleLineIcon,
};

const parseType = (type) => {
    if (type?.includes(" ")) {
        return type?.split(" ");
    } else if (type?.includes("/")) {
        return type?.split("/");
    } else {
        return [null, type];
    }
};

export function isIconeDisponivel(type, libraryOverride) {
    if (!type) {
        return false;
    }

    const [libFromType, iconName] = parseType(type);

    const targetLibKey = libraryOverride || libFromType;

    if (targetLibKey) {
        const selectedIcons = _.get(iconLibraries, targetLibKey);

        if (selectedIcons) {
            return !!_.get(selectedIcons, iconName);
        }

        return false;
    }

    return true;
}

const getIconComponent = (library, type) => {
    const [lib, icon] = parseType(type);
    const selectedIcons = _.get(iconLibraries, library || lib);
    return _.get(selectedIcons, icon, AntdIcons.AiOutlineBuild);
};

const isIconeComposto = (type) => {
    return type?.includes(" ") || type?.includes("/");
};

export const IconCore = ({ library, type, ...props }) => {
    const IconComponent = getIconComponent(library, type);

    if (library || isIconeComposto(type)) {
        return <Icon component={IconComponent} {...props} />;
    }

    return <Icon type={type} {...props} />;
};
