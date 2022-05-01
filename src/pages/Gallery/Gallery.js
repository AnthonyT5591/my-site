import React, { Component } from 'react'
import privateData from '../../private/secret.json'

import {
    Divider,
} from "@mui/material";

import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
    title_container: {
        marginBottom: "10px",
    },
    gallery_container: {
        borderRadius: "10px",
    },
    images: {
        padding: "2px",
        cursor: "pointer"
    },
    default: {
        backgroundColor: "#161b22",
    },
    accent: {
        backgroundColor: "#221d16",
    }
});
export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gallery: []
        }

        this.clickGallery = this.clickGallery.bind(this);
    }

    componentDidMount() {
        fetch(privateData.Api_Data.giphy.trending_url + privateData.Api_Data.giphy.api_key)
            .then(res => res.json())
            .then(res => {
                this.setState({ gallery: res.data });
            })
    }

    clickGallery(content) {
        window.open(content.url);
    }
    renderGallery() {
        let temp = [];
        if (this.state.gallery.length > 0) {
            this.state.gallery.forEach((c, i) => {
                temp.push(
                    <img key={i}
                        className={css(styles.images)}
                        onClick={() => {
                            this.clickGallery(c)
                        }} src={c.images.fixed_height_small.url} />
                )
            })
        }

        return temp;
    }
    render() {

        return (
            <div>
                <div className={css(styles.title_container)}>
                    <div>Top Trending Gifs!</div>
                    <Divider />
                </div>
                <div className={css(styles.gallery_container)}>
                    {this.renderGallery()}
                </div>
            </div >
        )
    }
}


