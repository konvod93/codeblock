import { Menu } from "../../models/Menu";
import { Topic } from "../../models/Topic";
import { typescriptMenu } from "./typescript";
import { nodeMenu } from "./node";

export const _menuLookup = (topic: Topic): Menu | null => {
    const topicLowerCase = topic.toLowerCase();

    if (topicLowerCase === 'typescript') return typescriptMenu;
    else if (topicLowerCase === 'node') return nodeMenu;
    return null;
}
