import { Link } from "@inertiajs/react";

export default function Paginator({ links, ...props }) {
    return (
        <div className="mb-4">
            <div className="flex flex-wrap mt-8">
                {links.map((link, key) => (
                    link.url !== null ?
                        <Link
                            id={key}
                            key={key}
                            href={link.url}
                            only={props.only ?? []}
                            className={
                                "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary" +
                                (link.active ? " bg-blue-700 text-white hover:text-inherit" : "")
                            }
                        >
                        <p dangerouslySetInnerHTML={{ __html: link.label }}></p>
                        </Link> :
                        <span id={key} key={key} className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"><p dangerouslySetInnerHTML={{ __html: link.label }}></p></span>
                ))}
            </div>
        </div>
    );
}