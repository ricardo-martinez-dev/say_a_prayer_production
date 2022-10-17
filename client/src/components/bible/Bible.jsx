import "./style.css";
import React, { Component } from "react";
import Spinner from "../spinner/Spinner";
const axiosFetch = require("../../utils/axiosFetch");
require("dotenv").config();

class Bible extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: { name: "genesis", chapter: 1, chapters: null },
      books: [
        {
          name: "genesis",
          numberOfChapters: 50,
          testament: "old",
        },
        {
          name: "exodus",
          numberOfChapters: 40,
          testament: "old",
        },
        {
          name: "leviticus",
          numberOfChapters: 27,
          testament: "old",
        },
        {
          name: "numbers",
          numberOfChapters: 36,
          testament: "old",
        },
        {
          name: "deuteronomy",
          numberOfChapters: 34,
          testament: "old",
        },
        {
          name: "joshua",
          numberOfChapters: 24,
          testament: "old",
        },
        {
          name: "judges",
          numberOfChapters: 21,
          testament: "old",
        },
        {
          name: "ruth",
          numberOfChapters: 4,
          testament: "old",
        },
        {
          name: "1 samuel",
          numberOfChapters: 31,
          testament: "old",
        },
        {
          name: "2 samuel",
          numberOfChapters: 24,
          testament: "old",
        },
        {
          name: "1 kings",
          numberOfChapters: 22,
          testament: "old",
        },
        {
          name: "2 kings",
          numberOfChapters: 25,
          testament: "old",
        },
        {
          name: "1 chronicles",
          numberOfChapters: 29,
          testament: "old",
        },
        {
          name: "2 chronicles",
          numberOfChapters: 36,
          testament: "old",
        },
        {
          name: "ezra",
          numberOfChapters: 10,
          testament: "old",
        },
        {
          name: "nehemiah",
          numberOfChapters: 13,
          testament: "old",
        },
        {
          name: "esther",
          numberOfChapters: 10,
          testament: "old",
        },
        {
          name: "job",
          numberOfChapters: 42,
          testament: "old",
        },
        {
          name: "psalm",
          numberOfChapters: 150,
          testament: "old",
        },
        {
          name: "proverbs",
          numberOfChapters: 31,
          testament: "old",
        },
        {
          name: "ecclesiastes",
          numberOfChapters: 12,
          testament: "old",
        },
        {
          name: "song of songs",
          numberOfChapters: 8,
          testament: "old",
        },
        {
          name: "isaiah",
          numberOfChapters: 66,
          testament: "old",
        },
        {
          name: "jeremiah",
          numberOfChapters: 52,
          testament: "old",
        },
        {
          name: "lamentations",
          numberOfChapters: 5,
          testament: "old",
        },
        {
          name: "ezekiel",
          numberOfChapters: 48,
          testament: "old",
        },
        {
          name: "daniel",
          numberOfChapters: 12,
          testament: "old",
        },
        {
          name: "hosea",
          numberOfChapters: 14,
          testament: "old",
        },
        {
          name: "joel",
          numberOfChapters: 3,
          testament: "old",
        },
        {
          name: "amos",
          numberOfChapters: 9,
          testament: "old",
        },
        {
          name: "obadiah",
          numberOfChapters: 1,
          testament: "old",
        },
        {
          name: "jonah",
          numberOfChapters: 4,
          testament: "old",
        },
        {
          name: "micah",
          numberOfChapters: 7,
          testament: "old",
        },
        {
          name: "nahum",
          numberOfChapters: 3,
          testament: "old",
        },
        {
          name: "habakkuk",
          numberOfChapters: 3,
          testament: "old",
        },
        {
          name: "zephaniah",
          numberOfChapters: 3,
          testament: "old",
        },
        {
          name: "haggai",
          numberOfChapters: 2,
          testament: "old",
        },
        {
          name: "zechariah",
          numberOfChapters: 14,
          testament: "old",
        },
        {
          name: "malachi",
          numberOfChapters: 4,
          testament: "old",
        },
        {
          name: "matthew",
          numberOfChapters: 28,
          testament: "new",
        },
        {
          name: "mark",
          numberOfChapters: 16,
          testament: "new",
        },
        {
          name: "luke",
          numberOfChapters: 24,
          testament: "new",
        },
        {
          name: "john",
          numberOfChapters: 21,
          testament: "new",
        },
        {
          name: "acts",
          numberOfChapters: 28,
          testament: "new",
        },
        {
          name: "romans",
          numberOfChapters: 16,
          testament: "new",
        },
        {
          name: "1 corinthians",
          numberOfChapters: 16,
          testament: "new",
        },
        {
          name: "2 corinthians",
          numberOfChapters: 13,
          testament: "new",
        },
        {
          name: "galatians",
          numberOfChapters: 6,
          testament: "new",
        },
        {
          name: "ephesians",
          numberOfChapters: 6,
          testament: "new",
        },
        {
          name: "philippians",
          numberOfChapters: 4,
          testament: "new",
        },
        {
          name: "colossians",
          numberOfChapters: 4,
          testament: "new",
        },
        {
          name: "1 thessalonians",
          numberOfChapters: 5,
          testament: "new",
        },
        {
          name: "2 thessalonians",
          numberOfChapters: 3,
          testament: "new",
        },
        {
          name: "1 timothy",
          numberOfChapters: 6,
          testament: "new",
        },
        {
          name: "2 timothy",
          numberOfChapters: 4,
          testament: "new",
        },
        {
          name: "titus",
          numberOfChapters: 3,
          testament: "new",
        },
        {
          name: "philemon",
          numberOfChapters: 1,
          testament: "new",
        },
        {
          name: "hebrews",
          numberOfChapters: 13,
          testament: "new",
        },
        {
          name: "james",
          numberOfChapters: 5,
          testament: "new",
        },
        {
          name: "1 peter",
          numberOfChapters: 5,
          testament: "new",
        },
        {
          name: "2 peter",
          numberOfChapters: 3,
          testament: "new",
        },
        {
          name: "1 john",
          numberOfChapters: 5,
          testament: "new",
        },
        {
          name: "2 john",
          numberOfChapters: 1,
          testament: "new",
        },
        {
          name: "3 john",
          numberOfChapters: 1,
          testament: "new",
        },
        {
          name: "jude",
          numberOfChapters: 1,
          testament: "new",
        },
        {
          name: "revelation",
          numberOfChapters: 22,
          testament: "new",
        },
      ],
      chapter: null,
      isLoading: true,
      chosenBook: "",
    };
  }

  getArrayOfChapters = async () => {
    const { books } = this.state;
    const chosenBook = this.state.selection.name;
    let chapters = [];

    for (let i in books) {
      if (books[i]["name"] !== chosenBook) continue;

      while (chapters.length < books[i]["numberOfChapters"]) {
        chapters.push(chapters.length + 1);
      }
    }

    const selection = {
      name: this.state.selection.name,
      chapter: this.state.selection.chapter,
      chapters,
    };

    this.setState({ selection });
  };

  fetchChapter = async () => {
    const { name, chapter } = this.state.selection;
    const url = `${process.env.REACT_APP_API_URL}/bible`;
    const obj = { params: { name, chapter } };
    const res = await axiosFetch.axiosGet({ url, obj });

    this.setState({ chapter: res });
  };

  handleChange = async (e) => {
    const selection = this.state.selection;
    selection[e.target.name] = e.target.value;

    // if change book reset chapter to 1
    if (e.target.name === "name") selection.chapter = 1;

    this.setState({ selection, isLoading: true });

    await this.fetchChapter();
    await this.getArrayOfChapters();

    this.setState({ isLoading: false });
  };

  handleChangePage = async (obj) => {
    const selection = this.state.selection;
    selection["chapter"] =
      obj.direction === "next"
        ? parseInt(selection.chapter) + 1
        : parseInt(selection.chapter) - 1;

    this.setState({ selection, isLoading: true });

    await this.fetchChapter();
    this.setState({ isLoading: false });
  };

  async componentDidMount() {
    await this.fetchChapter();
    await this.getArrayOfChapters();

    this.setState({ isLoading: false });
  }

  render() {
    const { books, selection, chapter } = this.state;

    return (
      <div
        id="bible"
        className="sectionComponent"
        onClick={() => this.props.functions.onHidenav()}
      >
        <h2>Bible</h2>

        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div id="selection">
            <div id="book-list" className="safari">
              <select
                name="name"
                id="books"
                value={selection.name}
                onChange={(e) => this.handleChange(e)}
              >
                {books.map((book, i) => (
                  <option value={book.name} key={i}>
                    {book.name}
                  </option>
                ))}
              </select>
            </div>

            <div id="chapter-list">
              <select
                name="chapter"
                id="chapters"
                value={selection.chapter}
                onChange={(e) => this.handleChange(e)}
              >
                {selection.chapters.map((n) => {
                  return (
                    <option value={n} key={n}>
                      {n}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        )}

        {!this.state.isLoading && (
          <div id="chapter">
            <BibleTitle
              properties={selection}
              showBookName={true}
              functions={{ onChangePage: this.handleChangePage }}
            />

            <h3 id="chapter-num">Chapter {selection.chapter}</h3>

            <BibleChapter chapter={chapter} />

            <BibleTitle
              properties={selection}
              showBookName={false}
              functions={{ onChangePage: this.handleChangePage }}
            />
          </div>
        )}
      </div>
    );
  }
}

class BibleChapter extends React.Component {
  render() {
    if (!this.props.chapter) return null;
    const { chapter } = this.props;

    return (
      <ul>
        {chapter.map((el, i) => {
          const elem = Object.keys(el);

          if (elem[0] === "header") {
            return (
              <li className="chapter-header" key={i}>
                {el.header.replace(/ *\[[^\]]*]/gi, "")}
              </li>
            );
          }

          return (
            <li className="chapter-verse" key={i}>
              {el.verse.replace(/ *\[[^\]]*]/gi, "")}
            </li>
          );
        })}
      </ul>
    );
  }
}

class BibleTitle extends React.Component {
  render() {
    const { properties, showBookName } = this.props;
    const name = (() => {
      const name = properties.name.split(" ");
      let res = name.map((n) => n[0].toUpperCase() + n.substring(1));

      return res.join(" ");
    })();

    return (
      <h2 id="chapter-header">
        {properties.chapter > 1 ? (
          <span
            className="arrows"
            onClick={() =>
              this.props.functions.onChangePage({ direction: "previous" })
            }
          >
            <i className="fa-solid fa-angle-left"></i>
          </span>
        ) : (
          <span className="arrows"></span>
        )}

        {showBookName && <span>{name}</span>}

        {!showBookName && (
          <span id="chap-title-end">
            End of {name} {properties.chapter}
          </span>
        )}

        {properties.chapter < properties.chapters.length ? (
          <span
            className="arrows"
            onClick={() =>
              this.props.functions.onChangePage({ direction: "next" })
            }
          >
            <i className="fa-solid fa-angle-right"></i>
          </span>
        ) : (
          <span className="arrows"></span>
        )}
      </h2>
    );
  }
}

export default Bible;
