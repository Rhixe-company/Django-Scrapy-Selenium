import type { Comic as MyComic } from "../../types/ComicType";
import Link from "next/link";
export default function Comic({ item }: { item: MyComic }) {
  return (
    <tr>
      <td>{item.title}</td>

      <td>{item.status}</td>
      <td>{item.rating}</td>
      <td>{item.updated_at}</td>
      <td>
        <Link href={`/comics/edit/${item.slug}`}>Edit</Link>
      </td>
    </tr>
  );
}
