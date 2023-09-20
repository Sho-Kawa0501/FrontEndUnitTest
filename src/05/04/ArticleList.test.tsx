import { render, screen, within } from "@testing-library/react";
import { ArticleList } from "./ArticleList";
import { items } from "./fixture"; //テスト用データ

test("タイトルの表示", () => {
  render(<ArticleList items={items} />);
  expect(screen.getByRole("heading", { name: "記事一覧" })).toBeInTheDocument();
});

test("items の数だけ一覧表示される", () => {
  render(<ArticleList items={items} />);
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

test("items の数だけ一覧表示される", () => {
  render(<ArticleList items={items} />);//レンダー関数でArticleListとitemsを指定。
  const list = screen.getByRole("list");//ulタグは暗黙のロールとしてlistを持つので、これで
  expect(list).toBeInTheDocument();//アサーションでlistを指定、マッチャーでlistがドキュメントに存在しているかをチェック
  //within...testinglibraryの一種 //withinで絞り込みが可能。
  //getAllByRoleは該当要素を配列で取得可能。
  //
  expect(within(list).getAllByRole("listitem")).toHaveLength(2);
});

test("一覧アイテムが空のとき「投稿記事がありません」が表示される", () => {
  render(<ArticleList items={[]} />);
  const list = screen.queryByRole("list");
  expect(list).not.toBeInTheDocument();
  expect(list).toBeNull();
  expect(screen.getByText("投稿記事がありません")).toBeInTheDocument();
});

test("Snapshot: items の数だけ一覧表示される", () => {
  const { container } = render(<ArticleList items={items} />);
  expect(container).toMatchSnapshot();
});
